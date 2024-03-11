export default function handleSearch(data, setFilteredDataList, paginate, key) {
    return function (searchText) {
      const filteredList = data.filter((item) =>
        item[key].toString().toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDataList(filteredList);
      paginate(1);
    };
  }