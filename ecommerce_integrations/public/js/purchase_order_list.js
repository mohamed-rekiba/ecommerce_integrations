frappe.listview_settings["Purchase Order"] = {
    formatters: {
        custom_purchase_status(val) {
            if (val == "New Order") {
                return "<span class='indicator-pill blue'>" + __(val) + "</span>"; // Blue for New Order
            } else if (val == "Preparing") {
                return "<span class='indicator-pill yellow'>" + __(val) + "</span>"; // Yellow for Preparing
            } else if (val == "Shipped") {
                return "<span class='indicator-pill green'>" + __(val) + "</span>"; // Light green for Shipped
            } else if (val == "Delivered in WH") {
                return "<span class='indicator-pill purple'>" + __(val) + "</span>"; // Purple for Delivered in WH
            } else if (val == "Cancelled") {
                return "<span class='indicator-pill red'>" + __(val) + "</span>"; // Red for Cancelled
            }
        }
    }
};
