import os
import torch
import torch.nn as nn
from torchvision import transforms, models
from flask import Flask, render_template, request, redirect, url_for
from PIL import Image
import numpy as np

# -----------------------------
# Flask app setup
# -----------------------------
app = Flask(__name__)

# Ensure upload folder exists
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# -----------------------------
# Model setup
# -----------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load pretrained model (ResNet18)
model = models.resnet18(pretrained=False)
num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 3)  # 3 classes in your dataset

# Load trained weights
model.load_state_dict(torch.load("model.pth", map_location=device))
model.to(device)
model.eval()

# Transform for input image
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# Class labels
classes = ["Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust"]

# -----------------------------
# Prediction function
# -----------------------------
def prediction(image_path):
    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image)

    output = output.cpu().numpy()
    index = np.argmax(output)
    return index

# -----------------------------
# Routes
# -----------------------------
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if "file" not in request.files:
            return redirect(request.url)

        file = request.files["file"]
        if file.filename == "":
            return redirect(request.url)

        if file:
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
            file.save(filepath)

            pred_index = prediction(filepath)
            result = classes[pred_index]

            return render_template("index.html", result=result, user_image=filepath)

    return render_template("index.html")

# -----------------------------
# Run the app
# -----------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # use PORT from Render/Railway
    app.run(host="0.0.0.0", port=port, debug=False)
