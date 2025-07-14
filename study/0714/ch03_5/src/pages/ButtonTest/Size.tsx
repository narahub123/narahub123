import { Button } from "../../theme/daisyui";

const Size = () => {
  return (
    <section className="mt-4">
      <h2 className="text-5xl font-bold text-center">Size</h2>
      <div className="flex mt-4 justify-evenly">
        <Button className="btn-lg btn-primary">BUTTON</Button>
        <Button className="btn-md btn-second">BUTTON</Button>
        <Button className="btn-sm btn-accent">BUTTON</Button>
        <Button className="btn-xs btn-info">BUTTON</Button>
      </div>
    </section>
  );
};

export default Size;
