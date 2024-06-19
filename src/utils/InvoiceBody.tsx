export const invoiceBody = {
  Line: [
    {
      Amount: 100.0,
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: {
          value: '1', // Change to a valid item reference in your QuickBooks account
          name: 'Services',
        },
      },
    },
  ],
  CustomerRef: {
    value: '1', // Change to a valid customer reference in your QuickBooks account
  },
};
