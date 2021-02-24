<h1 style='display: flex; justify-content: space-between; align-items: center;'>
    <span>
        ebay-snackbar-dialog
    </span>
    <span style='font-weight: normal; font-size: medium; margin-bottom: -15px;'>
        DS v1.0.0
    </span>
</h1>

```marko
<ebay-snackbar-dialog>
    Basic Snackbar
</ebay-snackbar-dialog>
```

## Description

A snackbar is a non-modal dialog that appears in response to a lightweight user action. It disappears automatically after a minimum of 6 seconds.

In the case of type="action", the user should provide the open state as a boolean and a function that will be called with an on-close event to close the snackbar.

## Attributes

| Name   | Type    | Stateful | Required | Description                                                                         |
| ------ | ------- | -------- | -------- | ----------------------------------------------------------------------------------- |
| `type` | String  | No       | No       | Options are default or action. Action types include a button to close the snackbar. |
| `open` | Boolean | Yes      | No       | For the action type, the open state must be passed into the component.              |