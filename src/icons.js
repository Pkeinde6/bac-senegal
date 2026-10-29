import { Sigma, Atom, Leaf, Brain, BookOpen, Globe, Languages, TrendingUp, Calculator, Wrench, Book } from 'lucide-vue-next'

const icones = { Sigma, Atom, Leaf, Brain, BookOpen, Globe, Languages, TrendingUp, Calculator, Wrench }
export const icone = (nom) => icones[nom] ?? Book
