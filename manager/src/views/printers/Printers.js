import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { getAllPrinters } from "../../store/printer/printerSlice";
import AddManager from "./AddPrinter";

const Printers = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  useEffect(() => {
    dispatch(getAllPrinters());
  }, []);

  const handleAddPrinter = () => {
    setIsAdd(true);
  };

  return (
    <div>
      <button onClick={handleAddPrinter}>Add Printers</button>
      {isAdd && (
        <>
          <Modal
            isOpen={isAdd}
            onRequestClose={() => setIsAdd(false)}
            contentLabel="Add Printer"
          >
            <AddManager setIsOpen={setIsAdd} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Printers;
