import ChefIcon from "../assets/chef-claude-icon.png"
export default function Header() {
    return (
        <header className="header">
            <img src={ChefIcon} className="chef-icon" alt="checf-icon" />
            <h1 className="title">Chef Claude</h1>
        </header>
    )
}