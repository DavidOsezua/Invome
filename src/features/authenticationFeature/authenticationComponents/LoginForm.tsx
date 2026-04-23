import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const LoginForm = () => {
  return (
    <form className="space-y-2">
      <div>
        <label htmlFor="">Email</label>
        <Input />
      </div>

      <div>
        <label htmlFor="">Password</label>
        <Input />
      </div>

      <div>
        <Button>Login</Button>
      </div>
    </form>
  );
};

export default LoginForm;
