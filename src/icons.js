import { Sigma, Atom, Leaf, Brain, BookOpen, Globe, Languages, TrendingUp, Calculator, Wrench, MessagesSquare, Book } from 'lucide-vue-next'

const icones = { Sigma, Atom, Leaf, Brain, BookOpen, Globe, Languages, TrendingUp, Calculator, Wrench, MessagesSquare }
export const icone = (nom) => icones[nom] ?? Book
