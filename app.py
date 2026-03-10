from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["skillswap"]
collection = db["offerte"]

@app.route("/")
def index():
	return render_template("index.html")

#Aggiungo un metodo per salvare un'offerta nel db
#Definizione di un endpoint, ossia un URL che il server ascolta
@app.route("/api/offerte", methods = ["GET","POST"]) #accetta dati in entrata e uscita
def crea_offerta():
	if  request.method == "POST":
		dati = request.get_json() #Legge dati JSON che arrivano dalla pagina HTML in dati
		nome = dati.get("nome")
		offro = dati.get("offro")
		cerco = dati.get("cerco")
		quartiere = dati.get("quartiere")
		#COORDINATE GEOGRAFICHE 
		latitudine = dati.get("lat") 
		longitudine = dati.get("lng")

		#Dizionario python che il db salverà come documento
		nuova_offerta = {
			"nome": nome,
			"offro": offro,
			"cerco": cerco,
			"quartiere": quartiere,
			"latitudine": latitudine,
			"longitudine": longitudine
		}

		#Salva il documento nel db
		collection.insert_one(nuova_offerta)
		#Risposta alla pagina HTML, il codice 201 HTTP corrisponde alla creazione andata a buon fine
		return jsonify({"messaggio" : "Offerta salvata!"})
	else:
		offerte = list(collection.find({}, {"_id" : 0})) #Legge tutti i doc dal db, _id=0 esclude il campo _id che aggiunge MongoDB al doc
		return jsonify(offerte) #Restituisce la lista delle offerte come JSON alla pagina HTML

@app.route("/static/service-worker.js")
def service_worker():
	return app.send_static_file("service-worker.js")	

@app.route("/favicon.ico")
def favicon():
    return app.send_static_file("icons/icon-192.png")

if __name__ == "__main__":
	app.run(debug = True)