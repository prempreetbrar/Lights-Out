import "./Cell.css";


function Cell({isLit, flipCell}) {
  return (
    <td className={`Cell ${isLit ? "Cell-lit" : ""}`} onClick={flipCell}/>
  )
}

export default Cell;