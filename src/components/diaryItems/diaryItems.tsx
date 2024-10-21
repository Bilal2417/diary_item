"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReduxProvider from "../reduxProvider/reduxProvider";
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../store/diarySlice';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


interface DiaryItem {
  id: string;
  item: string;
  date: string;
  description: string;
}


interface RootState {
  diarySlice: {
    items: DiaryItem[];
  };
}

export default function DiaryItems() {
  return <ReduxProvider>
    <Items />
  </ReduxProvider>;
}

function Items() {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DiaryItem | null>(null); 

  const handleClose = () => setShow(false);
  const handleShow = (item: DiaryItem) => {
    setSelectedItem(item);
    setShow(true);
  };

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.diarySlice.items);

  return (
    <>
      {data.map((item, index) => (
        <tr key={item.id}>
          <th scope="row">{index + 1}</th>
          <td onClick={() => handleShow(item)}>{item.item}</td>
          <td>{item.date}</td>
          <td>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => dispatch(removeItem(item))}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}

      {selectedItem && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem.item}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedItem.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <p className="primary">{selectedItem.date}</p>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
