import { useState } from "react";
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componenet";
import "./sing-up-form.styles.scss"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}



const SingUpForm = () => {

    const [formFileds, setFormFileds] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFileds;

    const resetFormFields = () => {
        setFormFileds(defaultFormFields)
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Password dose not match")
            return;
        }



        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)

            await createUserDocumentFromAuth(user , { displayName})
            resetFormFields();
        } catch (error) {
            if(error.code == "auth/email-already-in-use") {
                alert("email-is-already-in-use")
            }
            console.log("user error", error);
        }
    };

    const handelChange = (event) => {
        const { name, value } = event.target;
        setFormFileds({ ...formFileds, [name]: value });
    };

    return (
        <>
            <div className="sing-up-container">
                <h2>Don'y have an account</h2>
                <span>Sing up with your email and password</span>
                <form onSubmit={handelSubmit}>
                    <FormInput label="Display name" type="text" onChange={handelChange} required name="displayName" value={displayName} />
                    <FormInput label="email" type="email" onChange={handelChange} required name="email" value={email} />
                    <FormInput label="Password" type="password" onChange={handelChange} required name="password" value={password} />
                    <FormInput label="Conifirm password" type="password" onChange={handelChange} required name="confirmPassword" value={confirmPassword} />
                    <Button type="submit">Sing Up</Button>
                </form> 
            </div>
        </>
    );
}

export default SingUpForm;