import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "./NewInput.jsx";
import { isNotEmpty, isUsername, hasMinLength } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

function LoginForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const {
    value: usernameValue,
    handleInputChange: handleUsernameChange,
    handleInputValidation: handleUsernameBlur,
    hasError: usernameHasError,
  } = useInput("", (value) => isUsername(value, 2) && isNotEmpty(value));
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputValidation: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 2) && isNotEmpty(value));

  /* function handleSubmit(event) {
    event.preventDefault();

    if (usernameHasError || passwordHasError) {
      return;
    }
  } */

  return (
    <div className="bg-white shadow-2xl p-8 mx-4 mt-8 rounded-xl">
      <Form method="post">
        {data && data.error && (
          <ul>
            {Object.values(data.error).map((err) => (
              <li key={err} className="text-black">
                {err}
              </li>
            ))}
          </ul>
        )}
        <Input
          id="username"
          label="أسم المستخدم"
          type="text"
          name="username"
          onChange={handleUsernameChange}
          onBlur={handleUsernameBlur}
          value={usernameValue}
          error={usernameHasError && "الرجاءادخال اسم مستخدم صحيح"}
        />
        <Input
          id="password"
          label="كلمة المرور"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && "كلمة المرور يجب أن تكون 14 رقم"}
        />
        {data && data.message && (
          <p className="text-center mb-4 text-red-500 text-[18px]">
            {data.message}
          </p>
        )}
        <button
          disabled={isSubmitting}
          className="bg-emerald-500 px-6 py-1 text-white rounded-lg transition-all
         hover:bg-emerald-700 md:text-[25px] md:px-10"
        >
          {isSubmitting ? "loading" : "التالي"}
        </button>
      </Form>
    </div>
  );
}

export default LoginForm;
