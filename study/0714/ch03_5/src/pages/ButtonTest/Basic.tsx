import { Button } from "../../theme/daisyui";

const Basic = () => {
  return (
    <section className="mt-4">
      <h2 className="text-5xl font-bold text-center">Basic</h2>
      <div className="flex mt-4 justify-evenly">
        <button className="btn-primary">DAISY BUTTON</button>.
        <Button className="btn-primary">BUTTON</Button>
      </div>
    </section>
  );
};

export default Basic;
