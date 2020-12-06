import tensorflow as tf 
import efficientnet.keras as efn
import cv2
import numpy as np 
import json 
class ModelExe:
    # Load model 
    def __init__(self,model_path='model.h5'):
        self.model = tf.keras.models.load_model(model_path)
        label_path = 'labels.json'
        with open(label_path) as f_in:
            self.labels = json.load(f_in)
            self.labels = self.labels['label']        
    # Read and resize image 
    def read_image(self,path, im_size, normalize_image = False):
        img = cv2.imread(path, cv2.IMREAD_COLOR)  
        img = cv2.resize(img, (im_size, im_size))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB).astype(np.float32)
        if normalize_image:
            img /= 255.0  
        return img

    # Flip Image Left-Right
    def create_image_tta(self,im_res):
        im_res_lr = np.fliplr(im_res)
        return np.stack((im_res, im_res_lr))
    
    def predict(self,img_path):
        image = self.read_image(img_path, 256, normalize_image = True)  
        pred = self.model.predict(self.create_image_tta(image))
        max_value = np.max(np.mean(pred, axis = 0))
        max_index = np.argmax(np.mean(pred, axis = 0))
        if max_index in self.labels:
            return self.labels[max_index]
        else:
            return None