import React, { useEffect, useState } from "react";
import { ScoopaBase } from "scoopabase";

export default function DetailPage(props) {
  const [employeData, setEmployeData] = useState([]);
  const [newDate, setNewDate] = useState([]);
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);
  useEffect(() => {
    setEmployeData(() => [...props.data]);
    timeFormatter(props.data);
    //IndexDbSet
    indexDbSetting();
  }, [props.data]);

  function timeFormatter(e) {
    e.forEach((element) => {
      var d = new Date(element.hire_date);
      const day = d.getDate() < 10 ? 0 + d.getDate().toString() : d.getDate();
      const month =
        d.getMonth() <= 9 && d.getMonth() + 1 != 10
          ? 0 + (d.getMonth() + 1).toString()
          : d.getMonth() + 1;
      const year = d.getFullYear();
      const date = `${year}-${month}-${day}`;
      setNewDate((prev) => [...prev, date]);
    });
  }
  function indexDbSetting() {
    let db = new ScoopaBase("db");
    employeData &&
      employeData.forEach((element, index) => {
        db.collection("employees").add(
          {
            id: element.employee_id,
            firstname: element.first_name,
            lastname: element.last_name,
            departmentId: element.department_id,
            hireDate: isAdmin ? element.hire_date : null,
            salary: isAdmin ? element.salary : null,
          },
          index
        );
      });
  }
  function inputChangedHandler(event) {
    const updatedKeyword = event.target.value;
    // May be call for search result
    console.log(event);
  }
  if (props.isAdmin) {
    const tableEmployees = employeData.map((employe, index) => {
      return (
        <tr key={employe.first_name+index.toString()}>
          <td>
            <input
              type="text"
              value={employe.employee_id}
              onChange={(event) => inputChangedHandler(event)}
            />
          </td>
          <td>
            <input type="text" value={employe.first_name} readOnly />
          </td>
          <td>
            <input type="text" value={employe.last_name} readOnly />
          </td>
          <td>
            <input type="text" value={employe.salary + "$"} readOnly />
          </td>
          <td>
            <input
              type="date"
              data-date-inline-picker="true"
              value={newDate[index]}
              readOnly
            />
          </td>
          <td>
            <select>
              <option value={employe.department_id} readOnly>
                {employe.department_id == 1
                  ? "IT"
                  : employe.department_id == 2
                  ? "F-End"
                  : "B-End"}
              </option>
            </select>
          </td>
          <td>
            <input type="checkbox" readOnly />
          </td>
        </tr>
      );
    });
    return (
      <div className="auto-inner-table">
        <table id="my_table_1" data-toggle="table" data-sort-stable="true">
          <thead>
            <tr>
              <th data-sortable="true">Employe Id</th>
              <th data-sortable="true">First Name</th>
              <th data-sortable="true">Last Name</th>
              <th data-sortable="true">Salary</th>
              <th data-sortable="true">Hire Date</th>
              <th data-sortable="true">Department</th>
            </tr>
          </thead>
          <tbody>{tableEmployees}</tbody>
        </table>
      </div>
    );
  } else {
    const tableEmployees = employeData.map((employe, index) => {
      return (
        <tr key={employe.first_name+index.toString()}>
          <td>
            <input type="text" value={employe.first_name} readOnly />
          </td>
          <td>
            <input type="text" value={employe.last_name} readOnly />
          </td>
          <td>
            <select>
              <option value={employe.department_id} readOnly>
                {employe.department_id == 1
                  ? "IT"
                  : employe.department_id == 2
                  ? "F-End"
                  : "B-End"}
              </option>
            </select>
          </td>
          <td>
            <input
              type="date"
              data-date-inline-picker="true"
              value={newDate[index]}
              readOnly
            />
          </td>
          <td>
            <input type="checkbox" readOnly />
          </td>
        </tr>
      );
    });
    return (
      <div className="auto-inner-table">
        <table
          id="my_table_1"
          data-toggle="table"
          data-sort-stable="true"
          className="table"
        >
          <thead>
            <tr>
              <th data-sortable="true">First Name</th>
              <th data-sortable="true">Last Name</th>
              <th data-sortable="true">Department</th>
              {/* <th data-sortable="true">Salary</th> */}
              <th data-sortable="true">Hire Date</th>
            </tr>
          </thead>
          <tbody>{tableEmployees}</tbody>
        </table>
      </div>
    );
  }
}
