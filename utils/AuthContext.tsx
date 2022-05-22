import { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { Props } from '../components/Layout'
import { supabase } from './auth'

export interface UserType {
	uid: string
	fullName: string
	imgUrl: string
}

export interface AuthType {
	user: UserType | null
	signIn: () => Promise<void>
	signOut: () => Promise<void>
}

const AuthContext = createContext({} as AuthType)

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const auth = useAuthProvider()
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

const useAuthProvider = () => {
	const [user, setUser] = useState<UserType | null>(null)

	const createUser = async (session: Session | null) => {
		if (!session || !session.user) return
		const user: UserType = {
			uid: session.user!.id,
			fullName: session.user!.user_metadata.full_name,
			imgUrl: session.user!.user_metadata.picture,
		}
		const { data, error } = await supabase
			.from('users')
			.select('uid')
			.eq('uid', user.uid)
		if (!data!.length) {
			// create a new user
			const { data, error } = await supabase.from('users').insert([user])
		}
		setUser(user)
	}

	const signIn = async () => {
		const { session } = await supabase.auth.signIn(
			{
				provider: 'google',
			},
			{ redirectTo: '/' }
		)
		createUser(session)
	}

	const signOut = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			console.log(error)
		}
		setUser(null)
	}

	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') createUser(session)
			else if (event === 'SIGNED_OUT') setUser(null)
		})
	}, [])

	return { user, signIn, signOut }
}
