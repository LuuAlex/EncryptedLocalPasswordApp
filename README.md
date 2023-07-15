# LocalPasswordStorage
LocalPasswordStorage is a **React Native** app that allows users to store passwords locally. The passwords are encrypted on the user's device. Forgetting the master password results in a complete loss of data as the master password is used in creating the hashed key that encrypts the data. 


## How it Works:
Important data for recovering saved passwords are stored in a folder called "LocalPasswordStorageDATA" in the app's sandboxed folder on the device. In this folder are three .txt files: hash, salt, and user.
* **hash.txt**: Saves a **SHA3** hash of the password with salt appended to the front. The purpose is to check if the user-inputted password is correct.
* **salt.txt**: Saves the randomly created 64-character salt.
* **user.txt**: Stores encrypted passwords. Encrypted using **AES**. The key used for encryption is created using the master password and the salt, using the **PBKDF2** algorithm. This key is not stored on the device.

## Future Updates:
* Option to save password data in any folder of the user's choosing.
* Android Support 