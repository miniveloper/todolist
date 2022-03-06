import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as IToDo["category"] };
      const newToDos = [...oldToDos];

      newToDos.splice(targetIdx, 1, newToDo);
      return newToDos;
      // return [
      //   ...newToDos.slice(0, targetIdx),
      //   newToDo,
      //   ...newToDos.slice(targetIdx + 1),
      // ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
    </li>
  );
}

export default ToDo;
