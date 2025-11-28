import matplotlib.pyplot as plt
import numpy as np
import os

def generate_chart(df, params, model):
    plt.figure()

    X = df["X"]
    Y = df["Y"]

    a = params["a"]
    b = params["b"]

    plt.scatter(X, Y)

    if model == "linear":
        y_pred = a + b * X

    elif model == "logarithmic":
        y_pred = a + b * np.log(X)

    plt.plot(X, y_pred)

    path = f"uploads/{model}_chart.png"
    plt.savefig(path)
    plt.close()

    return path
