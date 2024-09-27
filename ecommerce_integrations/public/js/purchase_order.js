frappe.ui.form.on('Purchase Order', {
    refresh(frm) {
        setTimeout(() => {
            frm.remove_custom_button('Resume', 'Status');
            frm.remove_custom_button('Close', 'Status');
            frm.remove_custom_button('Re-open', 'Status');
            frm.remove_custom_button('Hold', 'Status');
        }, 10);
        // Hide the span with the specified class
        hideIndicatorPill();
        frm.trigger("add_purchase_status_buttons");
    },
    add_purchase_status_buttons(frm){
        frm.add_custom_button(
            __("Preparing"),
            () => frm.events.update_status(frm, "custom_purchase_status", "Preparing"),
            __("Purchase Status")
        );
        frm.add_custom_button(
            __("Shipped"),
            () => frm.events.update_status(frm, "custom_purchase_status", "Shipped"),
            __("Purchase Status")
        );
        frm.add_custom_button(
            __("Delivered in WH"),
            () => frm.events.update_status(frm, "custom_purchase_status", "Delivered in WH"),
            __("Purchase Status")
        );
        frm.add_custom_button(
            __("Cancelled"),
            () => frm.events.update_status(frm, "custom_purchase_status", "Cancelled"),
            __("Purchase Status")
        );
    },

    update_status(frm, field, value) {
        frappe.ui.form.is_saving = true;
        frappe.call({
            method: "ecommerce_integrations.methods.sales_order.update_status",
            args: {
                doctype: frm.doc.doctype,
                name: frm.doc.name,
                field: field,
                value: value
            },
            callback: function (r) {
                frm.reload_doc();
                frappe.msgprint({
                    title: __('Status Updated'),
                    message: __('The status has been successfully updated.'),
                    indicator: 'green'
                }); // Display a message to the user
            },
            always: function () {
                frappe.ui.form.is_saving = false;
            },
        });
    }
});

// Function to hide the indicator pill span
function hideIndicatorPill() {
    setTimeout(() => {
        let pill = document.querySelector('span.indicator-pill.no-indicator-dot.whitespace-nowrap.red');
        if (pill) {
            pill.style.display = 'none';
        }
        let general_pill = document.querySelector('span.indicator-pill.no-indicator-dot');
        if (general_pill) {
            pill.style.display = 'none';
        }
    }, 100);
}
