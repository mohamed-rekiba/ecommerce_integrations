import frappe
from ecommerce_integrations.events.sales_order import create_purchase_order
from ecommerce_integrations.utils.purchase_order import purchase_added_for_sales_order


@frappe.whitelist()
def update_status(doctype, name, field, value):
    # Fetch the document
    doc = frappe.get_doc(doctype, name)

    # Use `getattr` to dynamically get the attribute (field) and set its value
    if hasattr(doc, field):
        setattr(doc, field, value)
        doc.save()
        frappe.db.commit()  # Commit the transaction to the database

        if value == "Confirmed":
            if not purchase_added_for_sales_order(doc):
                create_purchase_order(doc)

        return f"{field} updated successfully to {value} in {doctype} {name}"
    else:
        return f"Field {field} does not exist in {doctype} {name}"
