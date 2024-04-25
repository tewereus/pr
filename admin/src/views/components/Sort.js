// import styles from "./styles.module.css";

const Sort = ({ sort, setSort }) => {
  const onSelectChange = ({ currentTarget: input }) => {
    setSort({ sort: input.value, order: sort.order });
  };

  const onArrowChange = () => {
    if (sort.order === "asc") {
      setSort({ sort: sort.sort, order: "desc" });
    } else {
      setSort({ sort: sort.sort, order: "asc" });
    }
  };

  return (
    <div className="container">
      <p className="sort_by">Sort By :</p>
      <select
        onChange={onSelectChange}
        className="select"
        defaultValue={sort.sort}
      >
        <option value="year">Year</option>
        <option value="rating">Rating</option>
      </select>
      <button className="arrow_btn" onClick={onArrowChange}>
        <p className="up_arrow">&uarr;</p>
        <p className="down_arrow">&darr;</p>
      </button>
    </div>
  );
};

export default Sort;
