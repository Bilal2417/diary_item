"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./diaryForm.css";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ReduxProvider from '../reduxProvider/reduxProvider';
import { addItem } from '../../store/diarySlice';
import DiaryItems from '../diaryItems/diaryItems';

interface DiaryFormInputs {
  item: string;
  date: string;
  description: string;
}

export default function Diary() {
  return (
    <ReduxProvider>
      <DiaryData />
    </ReduxProvider>
  );
}

function DiaryData() {
  const dispatch = useDispatch();
  const { handleSubmit, register, formState: { errors } } = useForm<DiaryFormInputs>();

  const storeData: SubmitHandler<DiaryFormInputs> = (data) => {
    console.log(data);
    dispatch(addItem(data));
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">Diary App</h4>

                  <form
                    className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                    onSubmit={handleSubmit(storeData)}
                  >
                    <div className='main-data-block'>
                      <div className='data-block'>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder='Add an Item'
                            {...register("item", { required: true, minLength: 3 })}
                          />
                          {errors.item && errors.item.type === "required" && <div className="color-red">Enter Item</div>}
                          {errors.item && errors.item.type === "minLength" && <div className="color-red">Item text should be at least 3 letters</div>}
                        </div>
                        <div>
                          <input
                            type="date"
                            className="form-control"
                            {...register("date", { required: true })}
                          />
                          {errors.date && errors.date.type === "required" && <div className="color-red">Date Required</div>}
                        </div>
                      </div>
                      <div className="form-outline">
                        <input
                          type="text"
                          className="form-control"
                          placeholder='Enter description here'
                          {...register("description", { required: true, minLength: 3 })}
                        />
                        {errors.description && errors.description.type === "required" && <div className="color-red">Enter description</div>}
                        {errors.description && errors.description.type === "minLength" && <div className="color-red">Description should be at least 3 letters</div>}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Add item to Diary
                      </button>
                    </div>
                  </form>

                  <table className="table mb-4">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Diary item</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <DiaryItems />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
