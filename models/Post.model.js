const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
        },
        summary: {
            type: String,
            required: [true, "Summary is required."],
        },
        content: {
            type: String,
            required: [true, "Content is required."],
        },
        file: {
            type: String,
            required: [true, "File is required."],
        },
    },
    {
        timestamps: true,
    }
);

const Post = model("Post", postSchema);

module.exports = Post;
