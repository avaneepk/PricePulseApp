const PriceTable = (props) => {
  return (
    <table
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "5px",
        color: "black",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th style={{ width: "10%" }}>Day</th>
          <th style={{ width: "10%" }}>Time</th>
          <th style={{ width: "15%" }}>Change</th>
          <th style={{ width: "20%" }}>Price</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((data, index) => (
          <tr key={index} style={{ borderTop: "1px solid black" }}>
            <td>{data.day}</td>
            <td>{data.time}</td>
            <td style={{ color: data.change > 0 ? "red" : "green" }}>
              {data.change}%
            </td>
            <td>{data.price} c/kWh</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
