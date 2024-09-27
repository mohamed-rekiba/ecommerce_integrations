frappe.listview_settings["Sales Order"] = {
    formatters: {
        custom_sales_status(val) {
            if (val == "Follow Up") {
                return "<span class='indicator-pill blue'>" + __(val) + "</span>";
            } else if (val == "Confirmed") {
                return "<span class='indicator-pill green'>" + __(val) + "</span>";
            } else if (val == "Deal Lost") {
                return "<span class='indicator-pill red'>" + __(val) + "</span>";
            } else if (val == "On Hold") {
                return "<span class='indicator-pill yellow'>" + __(val) + "</span>";
            } else if (val == "No Answer") {
                return "<span class='indicator-pill light-blue'>" + __(val) + "</span>";
            }
        },
        custom_logistics_status(val) {
            if (val == "Pending") {
                return "<span class='indicator-pill light-blue'>" + __(val) + "</span>"; // Updated to light blue
            } else if (val == "Preparing") {
                return "<span class='indicator-pill light-yellow'>" + __(val) + "</span>"; // Light yellow for preparing
            } else if (val == "Shipping") {
                return "<span class='indicator-pill blue'>" + __(val) + "</span>"; // Blue for shipping
            } else if (val == "Arrived WH") {
                return "<span class='indicator-pill purple'>" + __(val) + "</span>"; // Purple for Arrived WH
            } else if (val == "Delivered") {
                return "<span class='indicator-pill green'>" + __(val) + "</span>"; // Green for delivered
            } else if (val == "Cancelled") {
                return "<span class='indicator-pill red'>" + __(val) + "</span>"; // Red for cancelled
            } else if (val == "Lost") {
                return "<span class='indicator-pill orange'>" + __(val) + "</span>"; // Orange for lost
            }
        }
    }
};
