const express = require("express");
const PORT = 3000;
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome to homepage",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/todo", async (req, res) => {
  try {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid input",
      });
    }

    const createResponse = await Todo.create({
      title: createPayload.title,
      description: createPayload.description,
    });

    res.status(200).json({
      success: true,
      message: createResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const getResponse = await Todo.find();
    res.status(200).json({
      success: true,
      message: getResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.patch("/completed", async (req, res) => {
  try {
    const updatedPayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatedPayload);
    if (!parsedPayload.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid input",
      });
    }

    const findTodo = await Todo.find({
      _id: updatedPayload.id
    });

    if(!findTodo.length){
      res.status(200).json({
        success: false,
        message: 'id not found'
      });
    }

    const completedStatus = findTodo[0].completed
    const updatedCompletedStatus = !completedStatus

    await Todo.updateOne({ _id: updatedPayload.id }, { completed: updatedCompletedStatus });

    res.status(200).json({
      success: true,
      message: `Todo with _id: ${updatedPayload.id} marked as completed`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at Port: ${PORT}`);
});
