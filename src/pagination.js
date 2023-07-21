import React from "react";
import { useState } from "react";
export const Pagination = () => {
    const [input, setInput] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        age: "",
        state: []
    });
    const [search, setSearch] = useState(JSON.parse(localStorage.getItem("search")) || []);
    function change(e) {
        console.log(e.target)
        let { name, value } = e.target
        setInput({ ...input, [name]: value ,no: search?.length + 1 })
    }
    function Info(e) {
        console.log(e.target)
        setSearch([...search, input])
        localStorage.setItem("search", JSON.stringify(search))
    }
    function checkchange(e) {
        if (e.target.checked) {
            setInput({ ...input, state: [...input.state, e.target.value] })
        }
        else {
            setInput({ ...input, state: [...input.state.filter(value => value !== e.target.state)] })
        }
        console.log(e.target.checked, e.target.value)
    }
    console.log(input);
    const [currentpage, setCurrentpage] = useState(1);
    const recordPage = 5;
    const npage = Math.ceil(search?.length / recordPage);
    function prepage() {
        if (currentpage !== 1) {
            setCurrentpage(currentpage - 1)
        }
    }
    function ChangeCPage(id) {
        console.log(id)
        setCurrentpage(id)
    }
    function nextPage() {
        if (currentpage !== npage) {
            setCurrentpage(currentpage + 1)
        }
    }
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(search.length / recordPage); i++) {
        pageNumbers.push(i);
    }
    console.log("pageNumbers", pageNumbers, search?.slice(recordPage * currentpage - recordPage, currentpage * recordPage))
    return (

        <>
            <form style={{ marginTop: "3%" }}>
                <h1>Array Table</h1>
                <label htmlFor="name"> Name : </label>
                <input type="text" id="name" name="name" value={input.name} onChange={change} /><br /><br />
                <label htmlFor="surname"> Surname : </label>
                <input type="text" id="surname" name="surname" value={input.surname} onChange={change} /><br /><br />
                <label htmlFor="email">Email : </label>
                <input type="email" id="email" name="email" value={input.email} onChange={change} /><br /><br />
                <label htmlFor="phone"> Phone : </label>
                <input type="tel" id="phone" name="phone" value={input.phone} onChange={change} /><br /><br />
                <label htmlFor="age">Age : </label>
                <input type="number" id="age" name="age" value={input.age} onChange={change} /><br /><br />
                <label htmlFor="state">State : </label>
                <input type="checkbox" name="state" id="state" value="Gujarat" onChange={checkchange} />Gujarat
                <input type="checkbox" name="state" id="state" value="Rajsthan" onChange={checkchange} />Rajsthan
                <input type="checkbox" name="state" id="state" value="Madhya-Pradesh" onChange={checkchange} />Madhya-Pradesh<br /><br />
                <button type="button" onClick={Info}>submit</button>
            </form>
            <table className="table table-stripped table-warning">
                <thead>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                    <th>State</th>
                </thead>
                <tbody>
                    {search?.slice(recordPage * currentpage - recordPage, currentpage * recordPage).map((item) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.age}</td>
                                <td><ol>{item?.state?.map((index) => {
                                    return (
                                        <li>{index}</li>
                                    )
                                })}</ol></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button size="5" onClick={(e) => prepage(e)} >Previous</button>
            {pageNumbers.map((item) => <button onClick={(e) => ChangeCPage(parseInt(e.target.innerText))}>{item}</button>)}
            <button size="5" onClick={(e) => nextPage(e)} >Next</button>
        </>
    )
}
