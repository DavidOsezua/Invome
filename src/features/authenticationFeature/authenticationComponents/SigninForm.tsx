import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const SigninForm = () => {
  return (
    <form action="" className="space-y-2">
      <div>
        <label htmlFor="">First name</label>
        <Input />
      </div>
      {/* <div>
        <label htmlFor="">user name</label>
        <Input />
      </div> */}
      <div className="">
        <label htmlFor="">last name</label>
        <Input />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <Input />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <Input />
      </div>
      <div>
        <label htmlFor="">Confirm Password</label>
        <Input />
      </div>

      <div>
        <Button >Sign Up</Button>
      </div>
    </form>
  );
};

export default SigninForm;
