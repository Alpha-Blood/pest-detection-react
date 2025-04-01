import pickle

with open("ai_model/label_map.pkl", "rb") as f:
    label_map = pickle.load(f)

print(label_map)  # Should print something like {0: "Healthy", 1: "Disease A", 2: "Disease B"}
