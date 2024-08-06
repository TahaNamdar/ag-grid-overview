import { StoryFn } from "@storybook/react";
import React, { useState } from "react";
import Compo from "@/compo/compo";

export default { title: "SideBar", component: Compo };

const Template: StoryFn<any> = (args: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(args.isOpen);

  return <Compo {...args} isOpen={isOpen} setIsOpen={setIsOpen}></Compo>;
};

export const SideBar = Template.bind({});

SideBar.args = {
  title: "SideBar",
  children: <li className="p-2 text-white">Test Item</li>,
  className: "bg-blue-500",
  isOpen: false,
};
