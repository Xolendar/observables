import { Observable, Subject, BehaviorSubject, ReplaySubject } from "rxjs"

/* On utilise les observables lorsque l'on veut surveiller une modif de valeur et la traiter automatiquement lors du changement de celle-ci */

//observable
export const obsFunction = () => {
    let observable = new Observable(observer => observer.next('coucou de l\'observable'))
    let subscription = observable.subscribe(data => console.log(data)) // subscribe renvoie un objet de type Subscription

    subscription.unsubscribe() // On a ouvert le flux, il faut le refermer quand on n'en n'a plus besoin pour conserver les perfs
}

//Subjects

/* Un subject permet d'assigner une nouvelle valeur à l'observable sans devoir en instancier un nouveau */

export const subjFunction = () => {
    let subject = new Subject()
    subject.next('coucou du subject') // cette valeur ne sera pas affichée dans la console car le next est effectué avant le subscribe
    let subscription2 = subject.subscribe(data => console.log(data))
    subject.next('coucou 2 du subject')

    // exemple 
    const interval = () => {
        let i =1;
        let tempo = setInterval(()=> { // va exécuter le code toutes les x millisecondes
            if (i<5) {
                subject.next(`valeur ${i} du subject`)
            } else {
                subscription2.unsubscribe() // fermeture du flux quand plus besoin
                clearInterval(tempo) // arrêt de la répétition
            }
            i++
        }, 2000)
    }
    interval()
}

//behaviorsubject : valeur initiale + dernière valeur assignée
export const behaviorSubjFunction = () => {
    let behaviorSubject = new BehaviorSubject('valeur initiale du BS')
    behaviorSubject.next('coucou du BS')
let subscription3 = behaviorSubject.subscribe(data => console.log(data))
behaviorSubject.next('coucou2 du BS')
subscription3.unsubscribe()
}


// replaySubject : conserve un nombre x de valeurs assignées mais pas de valeur initiale
export const replaySubjectFunction = () => {
    let replaySubject = new ReplaySubject(2) // nombre de valeurs reçus AVANT le subscribe
    replaySubject.next('coucou du RS')
    replaySubject.next('coucou2 du RS')
    replaySubject.next('coucou3 du RS')
    replaySubject.next('coucou4 du RS')
    replaySubject.next('coucou5 du RS')
    let subscription4 = replaySubject.subscribe(data => console.log(data))
    replaySubject.next('coucou6 du RS')
    subscription4.unsubscribe()
}