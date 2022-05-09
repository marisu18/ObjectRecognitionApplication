export default function IdGenerator() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 16;
    let id = "";

    for (let i = 0; i < length; i++){
        if (i % 4 == 0 && i != 0) { id += '-'; }
        index = Math.floor(Math.random() * characters.length);
        id += characters.charAt(index);
    }

    return id;
}