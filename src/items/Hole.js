const Hole = ({ nItems = 0, click = () => null, player = "" }) => {
  let arr = [];
  for (let index = 0; index < nItems; index++) {
    arr.push(0);
  }
  return (
    <div className={"hole " + player} onClick={click}>
      {arr.map((d, i) => {
        return (
          <span key={"ball" + i} className="ball">
            .
          </span>
        );
      })}
    </div>
  );
};

export default Hole;
