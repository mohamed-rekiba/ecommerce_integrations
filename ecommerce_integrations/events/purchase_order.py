import frappe


def autoname(self, method=None):
	if self.custom_sales_order:
		shopify_order_number = frappe.db.get_value("Sales Order", self.custom_sales_order, "shopify_order_number")
		if shopify_order_number:
			self.name = str(shopify_order_number) + "-" + str(self.supplier_name)


def on_update(self, method=None):
	old_doc = self.get_doc_before_save()
	if old_doc:
		update_sales_order_status(self=self, old_doc=old_doc)
		update_items_stock_availability(self=self)


def update_items_stock_availability(self):
	for item in self.items:
		sales_order = item.get("sales_order")
		if sales_order:
			# Fetch the linked Sales Order document
			sales_order_doc = frappe.get_doc("Sales Order", sales_order)

			# Loop through the items in the Sales Order
			for so_item in sales_order_doc.items:
				if so_item.item_code == item.item_code:
					so_item.custom_out_of_stock = item.custom_out_of_stock

			# Save the updated Sales Order document
			sales_order_doc.save()


def update_sales_order_status(self, old_doc):
	for item in self.items:
		sales_order = item.get("sales_order")
		if sales_order:
			sales_order_doc = frappe.get_doc("Sales Order", sales_order)

			# Loop through items in the Sales Order and update the status
			for so_item in sales_order_doc.items:
				if so_item.item_code == item.item_code:
					so_item.custom_status = self.custom_purchase_status  # Update with the new status

			sales_order_doc.save()


def get_permission_query_conditions(*args, **kwargs):
	if "Supplier Portal" in frappe.get_roles() and frappe.session.user != "Administrator":
		supplier = frappe.db.get_value("Supplier", {"email_id": frappe.session.user})
		supplier_users = frappe.db.get_all(
			"Portal User",
			filters={"user": frappe.session.user, "parenttype": "Supplier"},
			pluck="parent"
		)

		conditions = []

		if supplier:
			conditions.append(f"`tabPurchase Order`.supplier = '{supplier}'")

		if supplier_users:
			supplier_user_conditions = ','.join([f"'{user}'" for user in supplier_users])
			conditions.append(f"`tabPurchase Order`.supplier IN ({supplier_user_conditions})")

		return " OR ".join(conditions) if conditions else None
