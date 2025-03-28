export default function() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Mentions légales</h1>

      <p>
        Le Site Internet est hébergé par la société Scalingo SAS (www.scalingo.com)
        dont le siège social est 15 avenue du Rhin 67100 Strasbourg, France.
        La société Scalingo dispose de Data-Centers hautement sécurisés situés sur le territoire Français,
        offrant d’importantes garanties de sécurité et respecte tant la législation européenne
        que la législation Française concernant les données personnelles.
      </p>

      <div>
        <div className="flex gap-2">
          <span className="font-bold">Dénomination :</span>
          <span>LUC TAILHARDAT CORPORATE - SIREN : 890 702 384</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Adresse du siège :</span>
          <span>14/14 Bis Rue Saint-Maur, 75011 Paris, France</span>
        </div>
      </div>
    </div>
  )
}