import './PerfilBeneficiario.css'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import NavBar from "../../Components/NavBar/NavBar"

export default function PerfilBeneficiario() {
    return (
        <main className="profile-page-main">
            <NavBar />
            <ProfileCard />
        </main>
    )
}