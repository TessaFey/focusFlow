"use client";

import { useState } from "react";

export default function Tasks() {
  const [text, setText] = useState("");
  const [due, setDue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [visibleInputs, setVisibleInputs] = useState({});

  const sectionKey = (priority, status) => `${priority}-${status}`;

  const taskList = (priority, status) =>
    tasks.map((task, index) =>
      task.priority === priority && task.status === status ? (
        <li key={index} className="ml-5">
          {task.text} - {task.due}
        </li>
      ) : null
    );

  const newTask = (priority, status, key) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          value={text}
          placeholder="Task Name"
          onChange={(e) => setText(e.target.value)}
          className="border pl-2 rounded-sm flex-1"
        />
        <div className="flex gap-1">
          <input
            value={due}
            placeholder="Due Date"
            type="date"
            onChange={(e) => setDue(e.target.value)}
            className="border pl-2 rounded-sm flex-2"
          />
          <button
            onClick={() => {
              setTasks([
                ...tasks,
                { text: text, priority: priority, status: status, due: due },
              ]);
              setVisibleInputs({
                ...visibleInputs,
                [key]: false,
              });
              setText("");
              setDue("");
            }}
            className="bg-[#8BA89E] pl-2 pr-2 rounded-sm flex-1"
          >
            Create
          </button>
        </div>
      </div>
    );
  };

  const taskDisplay = (priority) => {
    return (
      <div className="flex flex-col gap-8">
        <div className="mt-5 p-3 border-orange-400 border rounded-md">
          <div>
            {(() => {
              const key = sectionKey(priority, "To do");
              const visible = visibleInputs[key];
              return (
                <div>
                  {!visible && (
                    <div className="flex justify-between">
                      {" "}
                      <h2 className="">To Do</h2>
                      <button
                        onClick={() =>
                          setVisibleInputs({ ...visibleInputs, [key]: true })
                        }
                        className="rounded-sm w-6 h-6 hover:cursor-pointer"
                      >
                        <img src="images/more.png"></img>
                      </button>
                    </div>
                  )}
                  {visible && <div>{newTask(priority, "To do", key)}</div>}
                </div>
              );
            })()}
          </div>
          <div>{taskList(priority, "To do")}</div>
        </div>

        <div className="border border-yellow-400 p-3 rounded-md">
          <div>
            {(() => {
              const key = sectionKey(priority, "In progress");
              const visible = visibleInputs[key];
              return (
                <div>
                  {!visible && (
                    <div className="flex justify-between">
                      {" "}
                      <h2 className="">In progress</h2>
                      <button
                        onClick={() =>
                          setVisibleInputs({ ...visibleInputs, [key]: true })
                        }
                        className="rounded-sm w-6 h-6 hover:cursor-pointer"
                      >
                        <img src="images/more.png"></img>
                      </button>
                    </div>
                  )}
                  {visible && (
                    <div>{newTask(priority, "In progress", key)}</div>
                  )}
                </div>
              );
            })()}
          </div>
          <div>{taskList(priority, "In progress")}</div>
        </div>

        <div className="border border-green-400 p-3 rounded-md">
          <div>
            {(() => {
              const key = sectionKey(priority, "Done");
              const visible = visibleInputs[key];
              return (
                <div>
                  {!visible && (
                    <div className="flex justify-between">
                      {" "}
                      <h2 className="">Completed</h2>
                      <button
                        onClick={() =>
                          setVisibleInputs({ ...visibleInputs, [key]: true })
                        }
                        className="rounded-sm w-6 h-6 hover:cursor-pointer"
                      >
                        <img src="images/more.png"></img>
                      </button>
                    </div>
                  )}
                  {visible && <div>{newTask(priority, "Done", key)}</div>}
                </div>
              );
            })()}
          </div>
          <div>{taskList(priority, "Done")}</div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex justify-center">
      <div className="flex bg-[#3E3E3E] p-5 mt-2 w-7xl rounded-xl divide-x divide-white/30 gap-5">
        <div className="flex-1 p-4">
          <ul>
            <li>Today</li>
            <li>Upcoming</li>
          </ul>
        </div>

        <div className="flex-7 p-4 rounded-r-xl">
          <div className="flex justify-around gap-8">
            <div className="flex flex-col bg-[#353535] p-12 rounded-xl flex-1">
              <h1 className="font-bold text-2xl border-b pb-3 border-orange-500">
                High Priority
              </h1>
              {taskDisplay("high")}
            </div>

            <div className="flex flex-col bg-[#353535] p-12 rounded-xl flex-1">
              <h1 className="font-bold text-2xl border-b pb-3 border-yellow-500">
                Medium Priority
              </h1>
              {taskDisplay("medium")}
            </div>

            <div className="flex flex-col bg-[#353535] p-12 rounded-xl flex-1">
              <h1 className="font-bold text-2xl border-b pb-3 border-green-500">
                Low Priority
              </h1>
              {taskDisplay("low")}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
