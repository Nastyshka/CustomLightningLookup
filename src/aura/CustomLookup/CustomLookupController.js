({
    onfocus: function (component, event, helper) {
        $A.util.addClass(component.find("mySpinner"), "slds-show");
        var forOpen = component.find("searchRes");
        $A.util.addClass(forOpen, 'slds-is-open');
        $A.util.removeClass(forOpen, 'slds-is-close');
        // Get Default 5 Records order by createdDate DESC
        var getInputkeyWord = '';
        helper.searchHelper(component, event, getInputkeyWord);
    },
    onblur: function (component, event, helper) {
        component.set("v.listOfSearchRecords", null);
        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
    },

    keyPressController: function (component, event, helper) {
        // get the search Input keyword
        var getInputkeyWord = component.get("v.SearchKeyWord");
        // check if getInputKeyWord size id more then 0 then open the lookup result List and
        // call the helper
        // else close the lookup result List part.
        if (getInputkeyWord.length > 0) {
            var forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
            helper.searchHelper(component, event, getInputkeyWord);
        } else {
            component.set("v.listOfSearchRecords", null);
            var forclose = component.find("searchRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');
        }
    },

    // function for clear the Record Selaction
    clear: function (component, event, helper) {
        var pillTarget = component.find("lookup-pill");
        var lookUpTarget = component.find("lookupField");

        $A.util.addClass(pillTarget, 'slds-hide');
        $A.util.removeClass(pillTarget, 'slds-show');

        $A.util.addClass(lookUpTarget, 'slds-show');
        $A.util.removeClass(lookUpTarget, 'slds-hide');

        component.set("v.SearchKeyWord", null);
        component.set("v.listOfSearchRecords", null);
        component.set("v.selectedRecord", {});
        component.set("v.selectedRecordId", "");
    },

    // This function call when the end User Select any record from the result list.
    handleComponentEvent: function (component, event, helper) {
        // get the selected Account record from the COMPONETN event
        var selectedAccountGetFromEvent = event.getParam("recordByEvent");
        component.set("v.selectedRecord", selectedAccountGetFromEvent);
        component.set("v.selectedRecordId", selectedAccountGetFromEvent.Id);

        var forclose = component.find("lookup-pill");
        $A.util.addClass(forclose, 'slds-show');
        $A.util.removeClass(forclose, 'slds-hide');

        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');

        var lookUpTarget = component.find("lookupField");
        $A.util.addClass(lookUpTarget, 'slds-hide');
        $A.util.removeClass(lookUpTarget, 'slds-show');

        var isMultiple = component.get('v.multiple');
        if (isMultiple) {
            var clear = component.get('c.clear');
            $A.enqueueAction(clear);
            var newValue = event.getParam("recordByEvent");
                var selectedRecords = component.get("v.selectedList");
                    var selectedListPills = component.get("v.selectedRecordsPills");
            var isDuplicate = false;
            for (let i = 0; i < selectedRecords.length; i++) {
                if (selectedRecords[i].name === newValue.Id) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                var newPill = {
                    label: newValue.Name,
                    name: newValue.Id
                }
                selectedListPills.push(newPill);
                selectedRecords.push(newValue);
                component.set("v.selectedList", selectedRecords);
                component.set("v.selectedRecordsPills", selectedListPills);
            }
        }
    },

    onRecordSelected: function (component, event) {
        var newValue = event.getParam("recordByEvent");
        var selectedRecords = component.get("v.selectedList");
        var selectedListPills = component.get("v.selectedRecordsPills");
        var isDuplicate = false;
        for (let i = 0; i < selectedRecords.length; i++) {
            if (selectedRecords[i].name === newValue.Id) {
                isDuplicate = true;
                break;
            }
        }

        if (!isDuplicate) {
            var newPill = {
                label: newValue.Name,
                name: newValue.Id
            }
            selectedListPills.push(newPill);
            selectedRecords.push(newValue);
            component.set("v.selectedList", selectedRecords);
            component.set("v.selectedRecordsPills", selectedListPills);
        }
    },

    removeSelectedFromList: function (component, event, helper) {
        var selectedRecords = component.get("v.selectedList");
        var selectedRecordsPills = component.get("v.selectedRecordsPills");
        var valueToRemove = event.getParam("item").name;
        for (let i = 0; i < selectedRecords.length; i++) {
            if (selectedRecords[i].name === valueToRemove) {
                selectedRecords.splice(i, 1);
                selectedRecordsPills.splice(i, 1);
                break;
            }
        }
        component.set("v.selectedList", selectedRecords);
        component.set("v.selectedRecordsPills", selectedRecordsPills);
    },
})