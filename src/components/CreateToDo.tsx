import { useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, toDoState } from "./../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = ({ toDo }: IForm) => {
    setToDos((prev) => [...prev, { text: toDo, id: Date.now(), category }]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", { required: "Please write a to do" })}
        placeholder="write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
