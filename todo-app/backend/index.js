const express = require("express");
const PORT = 3000;
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "localhost:5173",
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
      message: `Todo created with _id: ${createResponse._id}`,
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

    await Todo.updateOne({ _id: updatedPayload.id }, { completed: true });

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
