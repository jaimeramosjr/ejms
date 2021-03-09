import React, { useState, useEffect} from 'react';

// import { _TEMP_USERS } from 'services/_TEMP_DATA';
import { apiService } from 'services/apiService';
import { SidepanelSize } from 'components/Sidepanel';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
const CustomModule = React.lazy(() => import('components/CustomModule'));
const CustomScheduleModule = React.lazy(() => import('components/CustomScheduleModule'));

async function getSchedData(api) {
  const response = await apiService.get(api);
  const choices = [];

  Object.entries(response).forEach(([key, value]) => {
    choices.push({ 'value': value.id, 'label': value.customerName1 });
  });

  return choices;
};

async function getData(api)
{
  const response = await apiService.get(api);
  const choices = [];

  Object.entries(response).forEach(([key, value]) =>
  {
    choices.push({ 'value': value.id, 'label': value.customerName1,
 });
  });

  console.log(choices);
  return choices;
};


export function Orders()
{

 
  const [ choices, setChoices ] = useState([]);
  const [ sidebarVisible, setSidebarVisible ] = useState([]);

  useEffect(() =>
  {
    (async () =>
    {
      const choicesData = await getData('/customers');
      setChoices(choicesData);
    })();
  }, []);

  // TODO: Add group multi-select
  //
  /** @type {import('components/Module').Field[]} */
   const sched_fields = [{
    name: 'status',
    label: 'Status',
    type: 'select',
    choices: [
      { value: 'open', label: 'Open' },
      { value: 'assigned', label: 'Assigned' },
      { value: 'loaded', label: 'Loaded' },
      { value: 'onTheWay', label: 'On the way' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'completed', label: 'Completed' },
    ],
  },
  {
    name: 'customerCode',
    label: 'Customer',
    type: 'select',
    choices
  },
  {
    name: 'vehicleCode',
    label: 'Vehicle',
    type: 'select',
    choices: [
      { value: 'aaa', label: 'Vehicle 1' }
    ]
  },
  {
    name: 'orderCode',
    label: 'Order',
    type: 'select',
    choices: [
      { value: 'aaa', label: 'Order 1' }
    ]
  },
  {
    name: 'orderDate',
    label: 'Date',
    type: 'datepicker',
  },
  {
    name: 'orderEta',
    label: 'ETA',
    type: 'datetimepicker',
  }
  ];
  const fields =
    [
      {
        name: '_id',
        label: 'Order Number',
        noInput: true,
        hidden: true,
      },
      {
        name: 'deliveryId',
        label: 'Delivery Number',
        //noInput: true,
      },
      {
        name: 'shipmentId',
        label: 'Shipment Number',
        //noInput: true,
      },
      {
        name: 'customers',
        label: 'Customer Name',
        //noInput: true,
        type: 'select',
        choices,
      },
      {
        name: 'sap_line',
        label: 'SAP',
        noInput: true,
        hidden: true,
      },
      {
        name: 'date',
        label: 'Date',
        noInput: true,
        hidden: true,
      },
      {
        name: 'product_code',
        label: 'Product Name',
        //noInput: true,
      },
      {
        name: 'qty',
        label: 'Qty',
        noInput: true,
      },
      {
        name: 'status',
        label: 'status',
        noInput: true,
      },
      {
        name: 'remarks',
        label: 'Remarks',
        // noInput: true,
      },
      {
        name: 'address',
        label: 'Address',
        noInput: true,
      },


    ];

    const schedulefields = [{
    name: 'status',
    label: 'Schedule',
    type: 'radio',
    choices: [
      { value: '1', label: 'March 3, 2021 9pm' , status:"Open"},
      { value: '2', label: 'March 4, 2021 9pm' , status:"Open"},
      { value: '3', label: 'March 5, 2021 9pm' , status:"Open"},
      { value: '4', label: 'March 6, 2021 9pm' , status:"Open"},
      { value: '5', label: 'March 7, 2021 9pm' , status:"Open"},
      { value: '6', label: 'March 8, 2021 9pm' , status:"Open"},
    ]
  }];

  return (

      <SplitterLayout primaryIndex={0}  secondaryInitialSize={400} vertical>
        <div className="my-pane" > <CustomModule
      name="Orders"
      singularName="Order"
      formSize={SidepanelSize.small}
      fields={fields}
      api="/orders"
      schedulefields={schedulefields}
    />
    </div>
        <div className="my-pane"> <CustomScheduleModule
      name="Orders"
      singularName="Order"
      formSize={SidepanelSize.small}
      fields={sched_fields}
      api="/orders"
      schedulefields={schedulefields}
    /></div>
      </SplitterLayout>

    
 

  );
}

export default Orders;
