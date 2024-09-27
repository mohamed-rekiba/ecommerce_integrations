import frappe


def sales_invoice_for_sales_order(sales_order):
	sales_invoice_added = False
	sales_invoice_items = frappe.get_all("Sales Invoice Item", {"sales_order": sales_order.name},
										 ignore_permissions=True)
	if len(sales_invoice_items) > 0:
		sales_invoice_added = True

	return sales_invoice_added
