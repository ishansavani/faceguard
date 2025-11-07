# utils/image_utils.py
import os
import torch
import torch.nn.functional as F
from torchvision import transforms, models
from PIL import Image, UnidentifiedImageError

class AIDetector:
    def __init__(self, model_path: str, device=None):
        self.device = device or (torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu"))

        # Initialize ResNet18 model
        self.model = models.resnet18(pretrained=False)
        self.model.fc = torch.nn.Linear(self.model.fc.in_features, 2)

        # Load trained model weights safely
        state = torch.load(model_path, map_location=self.device)
        self.model.load_state_dict(state)
        self.model.to(self.device)
        self.model.eval()

        self.classes = ['Real', 'AI-generated']

        # Preprocessing pipeline
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                 std=[0.229, 0.224, 0.225])
        ])

    def predict_pil(self, pil_image: Image.Image):
        """Predict from PIL image."""
        img = pil_image.convert("RGB")
        tensor = self.transform(img).unsqueeze(0).to(self.device)

        with torch.no_grad():
            outputs = self.model(tensor)
            probs = F.softmax(outputs, dim=1).cpu().numpy()[0]

        # Build output
        ai_prob = float(probs[1])
        real_prob = float(probs[0])
        prediction = "AI-generated" if ai_prob >= real_prob else "Real"
        confidence = max(ai_prob, real_prob)

        return {
            "confidence": confidence,
            "prediction": prediction,
            "probs": {
                "AI-generated": ai_prob,
                "Real": real_prob
            }
        }

    def predict_path(self, path: str):
        """Predict directly from image file path."""
        try:
            with Image.open(path) as img:
                return self.predict_pil(img)
        except UnidentifiedImageError:
            raise ValueError("Uploaded file is not a valid image")
