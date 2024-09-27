frappe.ui.form.on('Sales Order', {
    refresh(frm) {
        setTimeout(() => {
            frm.remove_custom_button('Resume', 'Status');
            frm.remove_custom_button('Close', 'Status');
            frm.remove_custom_button('Re-open', 'Status');
            frm.remove_custom_button('Hold', 'Status');
        }, 10);

        // Hide the span with the specified class
        hideIndicatorPill();

        frm.trigger("add_sales_order_status_buttons");
        frm.trigger("add_logistics_status_buttons");
    },
    per_billed(frm) {
        // Set custom_sales_status to "Confirmed" if per_billed is triggered
        if (frm.doc.per_billed == 100) {
            frm.set_value('custom_sales_status', "Confirmed");
        }
    },
    add_sales_order_status_buttons(frm){
        frm.add_custom_button(
            __("Confirmed"),
            () => frm.events.update_status(frm, "custom_sales_status", "Confirmed"),
            __("Sales Status")
        );
        frm.add_custom_button(
            __("No Answer"),
            () => frm.events.update_status(frm, "custom_sales_status", "No Answer"),
            __("Sales Status")
        );
        frm.add_custom_button(
            __("Deal Lost"),
            () => frm.events.update_status(frm, "custom_sales_status", "Deal Lost"),
            __("Sales Status")
        );
        frm.add_custom_button(
            __("On Hold"),
            () => frm.events.update_status(frm, "custom_sales_status", "On Hold"),
            __("Sales Status")
        );
    },
    add_logistics_status_buttons(frm){
        frm.add_custom_button(
            __("Preparing"),
            () => frm.events.update_status(frm, "custom_logistics_status", "Preparing"),
            __("Logistics Status")
        );
        frm.add_custom_button(
            __("Shipping"),
            () => frm.events.update_status(frm, "custom_logistics_status", "Shipping"),
            __("Logistics Status")
        );
        frm.add_custom_button(
            __("Arrived WH"),
            () => frm.events.update_status(frm, "custom_logistics_status", "Arrived WH"),
            __("Logistics Status")
        );
        frm.add_custom_button(
            __("Delivered"),
            () => frm.events.update_status(frm, "custom_logistics_status", "Delivered"),
            __("Logistics Status")
        );
        frm.add_custom_button(
            __("Cancelled"),
            () => frm.events.update_status(frm, "custom_logistics_status", "Cancelled"),
            __("Logistics Status")
        );
        frm.add_custom_button(
            __("Lost"),
            () => frm.events.update_status(frm, "custom_logistics_status", "Lost"),
            __("Logistics Status")
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

function hideIndicatorPill() {
    setTimeout(() => {
        let pills = document.querySelectorAll('span.indicator-pill.no-indicator-dot');
        pills.forEach(pill => {
            pill.style.display = 'none';
        });
    }, 100);
}
