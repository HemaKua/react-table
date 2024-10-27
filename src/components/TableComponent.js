import React,{useMemo, useState} from 'react';
 import { useTable, usePagination  } from 'react-table';
 


const TableComponent = () => {
  
  const [data, setData] = useState([
    // the usestate returns the 2 array data and setdata
// set data is used to re-render the data also updated the data
    {
    Details: { FName: 'Ram', LName: 'Sharma', Employee: '12345' }, 
User: {Mobile: 987654321, Age: 20},
Company:{Number:1, Company: 'Xyz', Remark:'Average'}
  } ,
  {
    Details: { FName: 'Shyam', LName: 'Singh', Employee: '67891' },
    User: { Mobile: 98778696, Age: 22 },
    Company: { Number: 2, Company: 'ABC', Remark: 'Good' },
  },
  {
    Details: { FName: 'Sunita', LName: 'Kashyap', Employee: '76543' },
    User: { Mobile: 987654321, Age: 30 },
    Company: { Number: 3, Company: 'Azikya', Remark: 'Good' },
  },
  {
    Details: { FName: 'Vikash', LName: 'Vishnoi', Employee: '54353' },
    User: { Mobile: 976638663, Age: 25 },
    Company: { Number: 4, Company: 'Software', Remark: 'Very Good' },
  },
  {
    Details: { FName: 'Amrita', LName: 'Sharma', Employee: '24323' },
    User: { Mobile: 67869649, Age: 28 },
    Company: { Number: 5, Company: 'ABC', Remark: 'Good' },
  },
  {
    Details: { FName: 'Anjali', LName: 'Chaudhary', Employee: '68788' },
    User: { Mobile: 587897576, Age: 26 },
    Company: { Number: 6, Company: 'XYZ', Remark: 'Excellent' },
  },
  {
    Details: { FName: 'Vikrant', LName: 'Thakur', Employee: '54367' },
    User: { Mobile: 234567889, Age: 40 },
    Company: { Number: 7, Company: 'Testing', Remark: 'Good' },
  },
  {
    Details: { FName: 'Sarvan', LName: 'Kumar', Employee: '94321' },
    User: { Mobile: 987654998, Age: 24 },
    Company: { Number: 8, Company: 'Technical', Remark: 'Good' },
  },
  {
    Details: { FName: 'Mohit', LName: 'Sharma', Employee: '58321' },
    User: { Mobile: 987654367, Age: 25 },
    Company: { Number: 9, Company: 'XYZ', Remark: 'Average' },
  },
  {
    Details: { FName: 'Angel', LName: 'Kashyap', Employee: '54821' },
    User: { Mobile: 9887665598, Age: 29 },
    Company: { Number: 10, Company: 'Azikya', Remark: 'Average' },
  },
  {
    Details: { FName: 'Vansh', LName: 'Sharma', Employee: '54388' },
    User: { Mobile: 987654881, Age: 30 },
    Company: { Number: 11, Company: 'Software', Remark: 'Very Good' },
  },
  {
    Details: { FName: 'John', LName: 'Chaudhary', Employee: '94321' },
    User: { Mobile: 987654551, Age: 40 },
    Company: { Number: 12, Company: 'XYZ', Remark: 'Good' },
  },
  {
    Details: { FName: 'Rashmi', LName: 'Singhaniya', Employee: '58921' },
    User: { Mobile: 987651234, Age: 30 },
    Company: { Number: 13, Company: 'Testing', Remark: 'Average' },
  },
  {
    Details: { FName: 'Alice', LName: 'Kumar', Employee: '54321' },
    User: { Mobile: 987654321, Age: 30 },
    Company: { Number: 14, Company: 'XYZ Corp', Remark: 'Good' },
  },
  {
    Details: { FName: 'Anuj', LName: 'Chaudhary', Employee: '98321' },
    User: { Mobile: 987654321, Age: 30 },
    Company: { Number: 15, Company: 'IBM', Remark: 'Good' },
  },
  {
    Details: { FName: 'Rani', LName: 'Thakur', Employee: '54321' },
    User: { Mobile: 987654321, Age: 30 },
    Company: { Number: 16, Company: 'XYZ', Remark: 'Good' },
  },
 ]);
 const [editIndex, setEditIndex] = useState(null);
 const [editedValues, setEditedValues] = useState({});
//Use memo we are using in the functional components ke undr and we don't need ups
//when we are using usememo when have to save the unwanted call 
  const columns = useMemo(
    ()=>[
    
      {
        Header: 'Details',
        columns: [
          { Header: 'FName', accessor: 'Details.FName' },
          { Header: 'LName', accessor: 'Details.LName' },
          { Header: 'Employee', accessor: 'Details.Employee' },
        ],
      },
      {
        Header: 'User',
        columns: [
          { Header: 'Mobile', accessor: 'User.Mobile' },
          { Header: 'Age', accessor: 'User.Age' },
        ],
      },
      {
        Header: 'Company',
        columns: [
          { Header: 'Number', accessor: 'Company.Number' },
          { Header: 'Company', accessor: 'Company.Company' },
          { Header: 'Remark', accessor: 'Company.Remark' },
        ],
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (row) => (
          <>
          {/* if editIndex is equal to the row.row.index then it is execute the other process */}
            {editIndex === row.row.index ? (
              <button onClick={() => handleEdit(row)}>Save</button>
            ) : (
              <button onClick={() => handleEdit(row)}>Edit</button>
            )}
            <button onClick={() => handleDelete(row)}>Delete</button>
          </>
        ),
      },
    ],
    []
  );

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
  //   columns,
  //   data,
  // });
  const {
    getTableProps,getTableBodyProps,headerGroups,rows,prepareRow,canPreviousPage,canNextPage, pageOptions, nextPage,previousPage, state: { pageIndex },} = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const handleEdit = (row) => {
    // if row is not equal to row then it print the console error value
    if (!row || !row.row) {
      console.error('Invalid row object:', row);
      return;
    }
    // it will get the current row index
    const rowIndex = row.row.index;
    // If edit index is same as current row index
    if (editIndex === rowIndex) {
      // Save the changes
      // updated the data using spread operator
      const updatedData = [...data];
      // it merge the edit value with the current value
      updatedData[rowIndex] = { ...updatedData[rowIndex], ...editedValues };
// set the updatedadata
      setData(updatedData);
      // null the edit index 
      setEditIndex(null);
      // set the edited values
      setEditedValues({});
    } else {
      // Edit index is  set  index and initialize edit values
      setEditIndex(rowIndex);
      //current value set
      const currentData = data[rowIndex];
      // initilaize the edited value
      setEditedValues({ ...currentData.Details, ...currentData.User, ...currentData.Company });
    }
  };
  

  const handleDelete = (row) => {
    const updatedData = data.filter((_, index) => index !== row.row.index);
    setData(updatedData);
  };

  return (
    <div>
      <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '2px solid black' }}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ borderRight: '2px solid black', padding: '8px' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ borderRight: '1px solid black', padding: '8px' }}>
                    {editIndex === row.index ? (
                      <input
                        type="text"
                        value={editedValues[cell.column.id]}
                        onChange={(e) => setEditedValues({ ...editedValues, [cell.column.id]: e.target.value })}
                      />
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                ))}
                <td>
                  {editIndex === row.index ? (
                    <button onClick={() => handleEdit(row)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(row)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(row)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
       {/* pagination */}
       <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{'click '}
        Page{' hello'}
        <em>
          {pageIndex + 1} of {pageOptions.length}
        </em>
      </div>
    </div>
  );
};

export default TableComponent;
