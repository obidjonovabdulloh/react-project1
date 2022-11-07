import { useState } from "react";
import { singInWithGooglePopup, singInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componenet";
import "./sing-in-form.styles.scss"

const defaultFormFields = {
    email: "",
    password: ""
}



const SingInForm = () => {
    const [formFileds, setFormFileds] = useState(defaultFormFields)
    const { email, password } = formFileds;

    const singinwithgoole = async () => {
         await singInWithGooglePopup();
    }

    const resetFormFields = () => {
        setFormFileds(defaultFormFields)
    }



    const handelSubmit = async (event) => {
        event.preventDefault();


        try {
            const { user } = await singInAuthUserWithEmailAndPassword(
                email,
                password
              );
              resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("incorrect password for email")
                    break
                case "auth/user-not-found":
                    alert("no user associated with this email")
                    break
                default:
                    console.log(error);
            }
        }
    };

    const handelChange = (event) => {
        const { name, value } = event.target;
        setFormFileds({ ...formFileds, [name]: value });
    };


    return (
        <>
            <div className="sing-up-container">
                <h2>Already have an account</h2>
                <span>Sing in with your email and password</span>
                <form onSubmit={handelSubmit}>
                    <FormInput label="email" type="email" onChange={handelChange} required name="email" value={email} />
                    <FormInput label="Password" type="password" onChange={handelChange} required name="password" value={password} />
                    <div className="buttons-container">
                        <Button type="submit">Sing In</Button>
                        <Button type="button" onClick={singinwithgoole} buttonType="google">Google Sing In</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SingInForm;