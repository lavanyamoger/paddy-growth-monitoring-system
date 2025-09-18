import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models
import os

# --------------------------
# 1. Dataset Path
# --------------------------
# Your dataset should look like:
# dataset/
#   ├── healthy/
#   └── unhealthy/
dataset_dir = "dataset"   # Change this path if needed

# --------------------------
# 2. Data Preprocessing
# --------------------------
datagen = ImageDataGenerator(
    rescale=1.0/255,
    validation_split=0.2,   # 80% train, 20% validation
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

train_generator = datagen.flow_from_directory(
    dataset_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode="binary",
    subset="training"
)

val_generator = datagen.flow_from_directory(
    dataset_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode="binary",
    subset="validation"
)

# --------------------------
# 3. Build Model
# --------------------------
base_model = MobileNetV2(
    weights="imagenet",
    include_top=False,
    input_shape=(224, 224, 3)
)
base_model.trainable = False  # freeze feature extractor

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation="relu"),
    layers.Dropout(0.3),
    layers.Dense(1, activation="sigmoid")
])

model.compile(optimizer="adam",
              loss="binary_crossentropy",
              metrics=["accuracy"])

# --------------------------
# 4. Train Model
# --------------------------
history = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=10
)

# --------------------------
# 5. Save Model
# --------------------------
os.makedirs("models", exist_ok=True)
model.save("models/paddy_disease_model.h5")
print("✅ Model saved at models/paddy_disease_model.h5")
