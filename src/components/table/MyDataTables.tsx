import DataTables, { Config } from "datatables.net-dt";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./custom.css"

export function MyDataTables({ ...props }: Config) {
  const tableRef = useRef<HTMLTableElement>(null);

  const users = useSelector((state: RootState) => state.data.usersData);

  useEffect(() => {
    const dt = new DataTables(tableRef.current!, props);
    return () => {
      dt.destroy();
    };
  }, [users]);

  return <table width="100%" style={{backgroundColor:"white",}}  ref={tableRef}></table>;
}

export default MyDataTables;