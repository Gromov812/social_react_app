import React, { Children } from 'react'
import u from '../Users/Users.module.css';



function UsersModal({setActive, isActive, children}) {
    console.log(isActive);
    function setActiveHandler() {
        setActive(false);
    }


    return (
        <>
            <div className={isActive ? `${u.modal__block} ${u.active}` : u.modal__block} onClick={setActiveHandler}>
                <div className={u.modal__block_content} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default UsersModal; 