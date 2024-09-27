import frappe


def purchase_added_for_sales_order(sales_order):
	purchase_added = False
	purchase_order_items = frappe.get_all("Purchase Order Item", {
		"sales_order": sales_order.name}, ignore_permissions=True)
	if len(purchase_order_items) > 0:
		purchase_added = True

	return purchase_added
